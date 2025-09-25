/* Task 1 - Complete the function according to the TODO */
function addComment(username, comment, addToStart) {
  const combinedComment = `${username}: ${comment}`;

  if (addToStart) {
    comments.unshift(combinedComment);
  } else {
    comments.push(combinedComment);
  }
}

/* Task 2 - Create your showWinnerMessage below according to the TODO */
function showWinnerMessage(message) {
  const winnerDisplay = document.getElementById("winner-display");
  winnerDisplay.innerHTML = message;
}
/* Task 3 - Create your pickWinner below according to the TODO */
function pickWinner() {
  const randomIndex = Math.floor(Math.random() * comments.length);
  const winningEntry = comments[randomIndex];
  const message = `Winner: <strong class ="text-success">${winningEntry}</strong>`;
  showWinnerMessage(message);
  showRandomEmoji();
}

/* Task 4 - Complete the function according to the TODO */
function showRandomEmoji() {
  // Pick a random celebratory emoji from the emojis array
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const emoji = emojis[randomIndex];
  // Update the #winner-emoji element with the emoji
  const emojiDisplay = document.getElementById("winner-emoji");
  if (emojiDisplay) {
    emojiDisplay.textContent = emoji;
  }
}

/* Task 5 - Complete the function according to the TODO */
function reverseOrder() {
  comments.reverse();
}

/* Task 6 - Complete the function according to the TODO */
function removeComment(index) {
  if (index >= 0 && index < comments.length) {
    comments.splice(index, 1);
    // Update the displayed comment list after removing
    if (typeof renderComments === "function") {
      renderComments();
    }
    // If renderComments is not defined, add code here to update the UI
  }
}

/* Task 7 - Complete the function according to the TODO */
function filterEmojiComments() {
  // Filter comments to only show those that have at least one non-emoji character (text or punctuation) after the username and colon
  const filteredComments = comments.filter((comment) => {
    // Remove username and colon (everything before the first ":")
    const content = comment.split(":").slice(1).join(":").trim();
    // If content is empty, exclude this comment
    if (!content) return false;
    // Split content into array of words (to handle multi-char emojis)
    const words = content.split(/\s+/).filter((w) => w.length > 0);
    // If there are no words, exclude this comment
    if (words.length === 0) return false;
    // If every word is an emoji from the emojis array, exclude this comment
    // Otherwise, include it (at least one word is not an emoji)
    return words.some((word) => !emojis.includes(word));
  });

  // Find the list-group element where comments are displayed
  const listGroup = document.querySelector("#comments-list .list-group");

  // If the list-group exists, update it to show only filtered comments
  if (listGroup) {
    // Remove any custom text alignment so Bootstrap/default CSS applies
    listGroup.style.textAlign = "";

    if (filteredComments.length > 0) {
      listGroup.innerHTML = filteredComments
        .map((comment) => `<div class="list-group-item">${comment}</div>`)
        .join("");
    } else {
      // If no comments match, show a message
      listGroup.innerHTML =
        "<div class='list-group-item'>No comments with text found.</div>";
    }
  }
}

/* Level Ups */

/* Level Up - Task 8 - Complete the filterList function according to the TODO */
function filterList(searchTerm, searchUsers) {
  const filteredComments = comments.filter((comment) =>
    comment.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredUsers = participants.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("Filtered Comments:", filteredComments);
  console.log("Filtered Users:", filteredUsers);
}

/* Level Up - Task 9 - Compelte the task according to the TODO */

/* Level Up - Task 10 - Add to the `addComment` function so that the an `@` sign is added to the username if there is not already one before it gets pushed into the array.  */
function addAtSignToUsername(username) {
  if (!username.startsWith("@")) {
    return `@${username}`;
  }
  return username;
}

// Add this at the end of your script.js file

// Wait for the DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Get the "Hide Emoji-Only" button by its id
  const filterEmojiBtn = document.getElementById("filter-emoji");
  if (filterEmojiBtn) {
    // When the button is clicked, call filterEmojiComments
    filterEmojiBtn.addEventListener("click", filterEmojiComments);
  }
});
