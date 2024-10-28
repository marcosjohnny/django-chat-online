const chatMessages = document.querySelector(".messages");

const setRoomActive = (room_id) => {
  document
    .querySelectorAll("li[id^='room']")
    .forEach((el) => el.classList.remove("active"));

  document.querySelector(`#room-${room_id}`).classList.add("active");
  document.querySelector("input[name^='room_id']").value = room_id;
};

const getMessages = async (room_id) => {
  const response = await fetch(`/${room_id}`);
  const html = await response.text();

  chatMessages.innerHTML = html;

  setRoomActive(room_id);
};

const sendMessage = async (data) => {
  const response = await fetch(`/${data.room_id}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": data.csrfmiddlewaretoken,
    },
    body: JSON.stringify(data),
  });

  const html = await response.text();

  const chatMessagesUpdate = document.querySelector(
    ".unique-message-container"
  );
  chatMessagesUpdate.insertAdjacentHTML("beforeend", html);

  document.querySelector("input[name^='message']").value = "";
};

document.querySelector(".send").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  sendMessage(data);
});

getMessages(1);
