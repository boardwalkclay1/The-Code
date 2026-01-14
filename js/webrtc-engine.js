export function createWebRTCManager() {
  const peers = new Map();
  let localStream = null;

  async function startLocalMedia(onStream) {
    if (localStream) {
      onStream(localStream);
      return;
    }
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    onStream(localStream);
  }

  function createPeerConnection(peerId) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    if (localStream) {
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    }

    pc.ontrack = event => {
      // Later: emit to UI to add remote video tile
      console.log("Remote track from", peerId, event.streams[0]);
    };

    pc.onicecandidate = event => {
      if (event.candidate) {
        // Later: send candidate via signaling server
        console.log("ICE candidate for", peerId, event.candidate);
      }
    };

    peers.set(peerId, pc);
    return pc;
  }

  return {
    startLocalMedia,
    createPeerConnection,
    peers
    // Later: add joinRoom, handleOffer, handleAnswer, handleCandidate, etc.
  };
}
