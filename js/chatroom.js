export function initChatroomUI({ profile, webrtc }) {
  const nameInput = document.getElementById("profile-name");
  const avatarInput = document.getElementById("profile-avatar-input");
  const avatarPreview = document.getElementById("profile-avatar-preview");
  const saveProfileBtn = document.getElementById("save-profile-btn");
  const profileStatus = document.getElementById("profile-status");

  const roomInput = document.getElementById("room-name");
  const joinRoomBtn = document.getElementById("join-room-btn");
  const roomStatus = document.getElementById("room-status");

  const videoGrid = document.getElementById("video-grid");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendChatBtn = document.getElementById("send-chat-btn");

  // Load profile into UI
  nameInput.value = profile.name || "";
  if (profile.avatarDataUrl) {
    avatarPreview.src = profile.avatarDataUrl;
  } else {
    avatarPreview.style.background = "#0a1220";
  }

  // Avatar upload
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      avatarPreview.src = e.target.result;
      profile.avatarDataUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Save profile
  saveProfileBtn.addEventListener("click", () => {
    profile.name = nameInput.value.trim() || "Guest";
    import("./profile-store.js").then(mod => {
      mod.saveProfile(profile);
      profileStatus.textContent = "Profile saved to this device.";
    });
  });

  // Join room
  joinRoomBtn.addEventListener("click", async () => {
    const roomName = roomInput.value.trim();
    if (!roomName) {
      roomStatus.textContent = "Enter a room name first.";
      return;
    }
    roomStatus.textContent = "Joining room (UI only, signaling TBD)...";

    await webrtc.startLocalMedia(stream => {
      addVideoTile(videoGrid, stream, profile.name || "You", "local");
    });

    // Placeholder: later you’ll call webrtc.joinRoom(roomName, profile)
    // and plug in your signaling server.
  });

  // Chat (local echo for now)
  sendChatBtn.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (!text) return;
    addChatLine(chatMessages, profile.name || "You", text);
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
    // Later: send over data channel
  });
}

function addVideoTile(grid, stream, label, id) {
  let tile = document.getElementById("video-" + id);
  if (!tile) {
    tile = document.createElement("div");
    tile.className = "video-tile";
    tile.id = "video-" + id;

    const video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    video.muted = id === "local";

    const nameLabel = document.createElement("div");
    nameLabel.className = "video-label";
    nameLabel.textContent = label;

    tile.appendChild(video);
    tile.appendChild(nameLabel);
    grid.appendChild(tile);

    video.srcObject = stream;
  }
}

function addChatLine(container, name, text) {
  const line = document.createElement("div");
  line.className = "chat-line";
  line.innerHTML = `<span class="chat-name">${name}:</span> ${text}`;
  container.appendChild(line);
}
