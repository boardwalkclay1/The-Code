// multi-peer-webrtc.js

const signalingUrl = "wss://WSS_URL_HERE"; // e.g. wss://your-app.onrender.com
const iceServers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

let socket = null;
let localStream = null;
let userId = null;
let roomId = null;

// userId -> RTCPeerConnection
const peers = {};
// userId -> <video>
const remoteVideos = {};

const localVideo = document.getElementById("localVideo");
const remoteVideosContainer = document.getElementById("remoteVideos");
const roomIdInput = document.getElementById("roomIdInput");
const joinRoomBtn = document.getElementById("joinRoomBtn");

async function startLocalMedia() {
  if (localStream) return;
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  localVideo.srcObject = localStream;
}

function connectSignaling() {
  socket = new WebSocket(signalingUrl);

  socket.addEventListener("open", () => {
    socket.send(
      JSON.stringify({
        type: "join-room",
        roomId,
        userId,
      })
    );
  });

  socket.addEventListener("message", async (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }

    const { type } = msg;

    if (type === "existing-users") {
      for (const otherId of msg.users) {
        await createPeerConnection(otherId, true);
      }
    }

    if (type === "user-joined") {
      const otherId = msg.userId;
      await createPeerConnection(otherId, true);
    }

    if (type === "user-left") {
      const otherId = msg.userId;
      closePeer(otherId);
    }

    if (type === "offer") {
      const from = msg.from;
      await createPeerConnection(from, false);
      await peers[from].setRemoteDescription(new RTCSessionDescription(msg.sdp));
      const answer = await peers[from].createAnswer();
      await peers[from].setLocalDescription(answer);

      socket.send(
        JSON.stringify({
          type: "answer",
          roomId,
          to: from,
          sdp: peers[from].localDescription,
        })
      );
    }

    if (type === "answer") {
      const from = msg.from;
      if (!peers[from]) return;
      await peers[from].setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }

    if (type === "ice-candidate") {
      const from = msg.from;
      if (!peers[from] || !msg.candidate) return;
      try {
        await peers[from].addIceCandidate(new RTCIceCandidate(msg.candidate));
      } catch {
        // ignore bad candidates
      }
    }
  });
}

async function createPeerConnection(otherId, isInitiator) {
  if (peers[otherId]) return peers[otherId];

  const pc = new RTCPeerConnection(iceServers);
  peers[otherId] = pc;

  if (localStream) {
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
  }

  pc.addEventListener("track", (event) => {
    let video = remoteVideos[otherId];
    if (!video) {
      video = document.createElement("video");
      video.autoplay = true;
      video.playsInline = true;
      video.className = "remote-video";
      remoteVideosContainer.appendChild(video);
      remoteVideos[otherId] = video;
    }
    video.srcObject = event.streams[0];
  });

  pc.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      socket.send(
        JSON.stringify({
          type: "ice-candidate",
          roomId,
          to: otherId,
          candidate: event.candidate,
        })
      );
    }
  });

  pc.addEventListener("connectionstatechange", () => {
    if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
      closePeer(otherId);
    }
  });

  if (isInitiator) {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.send(
      JSON.stringify({
        type: "offer",
        roomId,
        to: otherId,
        sdp: pc.localDescription,
      })
    );
  }

  return pc;
}

function closePeer(otherId) {
  const pc = peers[otherId];
  if (pc) {
    pc.close();
    delete peers[otherId];
  }
  const video = remoteVideos[otherId];
  if (video) {
    video.remove();
    delete remoteVideos[otherId];
  }
}

joinRoomBtn.addEventListener("click", async () => {
  roomId = (roomIdInput.value || "").trim();
  if (!roomId) {
    alert("Enter a room ID.");
    return;
  }

  userId = crypto.randomUUID();

  try {
    await startLocalMedia();
  } catch {
    alert("Camera/mic access failed.");
    return;
  }

  connectSignaling();
});
