const feedbackForm = document.getElementById("feedbackForm");
const feedbackContainer = document.getElementById("feedbackContainer");
const message = document.getElementById("message");

// Load previously submitted feedback
document.addEventListener("DOMContentLoaded", loadFeedback);

feedbackForm.addEventListener("submit", function (event) {
event.preventDefault();

const studentName = document.getElementById("studentName").value.trim();
const studentId = document.getElementById("studentId").value.trim();
const course = document.getElementById("course").value;
const faculty = document.getElementById("faculty").value.trim();
const comments = document.getElementById("comments").value.trim();

const ratingElement = document.querySelector(
    'input[name="rating"]:checked'
);

if (!ratingElement) {
    showMessage("Please select a rating.", "error");
    return;
}

const rating = Number(ratingElement.value);

if (!studentName || !studentId || !course || !faculty || !comments) {
    showMessage("Please fill in all fields.", "error");
    return;
}

const feedback = {
    id: Date.now(),
    studentName,
    studentId,
    course,
    faculty,
    rating,
    comments,
    date: new Date().toLocaleString()
};

const feedbackList = JSON.parse(
    localStorage.getItem("feedbackList")
) || [];

feedbackList.push(feedback);

localStorage.setItem(
    "feedbackList",
    JSON.stringify(feedbackList)
);

showMessage("Feedback submitted successfully!", "success");

feedbackForm.reset();

displayFeedback(feedbackList);


});

function showMessage(text, type) {
message.textContent = text;
message.className = type;

setTimeout(() => {
    message.textContent = "";
    message.className = "";
}, 3000);


}

function loadFeedback() {
const feedbackList = JSON.parse(
localStorage.getItem("feedbackList")
) || [];

displayFeedback(feedbackList);


}

function displayFeedback(feedbackList) {
feedbackContainer.innerHTML = "";

if (feedbackList.length === 0) {
    feedbackContainer.innerHTML =
        '<p class="empty-message">No feedback submitted yet.</p>';
    return;
}

feedbackList.forEach((feedback) => {
    const item = document.createElement("div");
    item.className = "feedback-item";

    const stars = "⭐".repeat(feedback.rating);

    item.innerHTML = `
        <h3>${escapeHTML(feedback.studentName)}</h3>
        <p><strong>Student ID:</strong> ${escapeHTML(feedback.studentId)}</p>
        <p><strong>Course:</strong> ${escapeHTML(feedback.course)}</p>
        <p><strong>Faculty:</strong> ${escapeHTML(feedback.faculty)}</p>
        <p>
            <strong>Rating:</strong>
            <span class="rating-display">${stars}</span>
        </p>
        <p><strong>Comments:</strong> ${escapeHTML(feedback.comments)}</p>
        <p><small>Submitted: ${escapeHTML(feedback.date)}</small></p>
    `;

    feedbackContainer.appendChild(item);
});


}

// Prevent HTML injection when displaying user input
function escapeHTML(value) {
const div = document.createElement("div");
div.textContent = value;
return div.innerHTML;
}