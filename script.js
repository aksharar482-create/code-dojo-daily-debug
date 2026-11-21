
const editor = document.getElementById("codeEditor");
const output = document.getElementById("testOutput");

const starterCode = {
    javascript: `function twoSum(nums, target) {
    // Write your solution here
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));`,

    python: `def two_sum(nums, target):
    # Write your solution here
    return []

print(two_sum([2, 7, 11, 15], 9))`
};

// Display today's date
document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

// Scroll to editor
function scrollToEditor() {
    document.getElementById("editor").scrollIntoView({
        behavior: "smooth"
    });
}

// Language selector
document.getElementById("language").addEventListener("change", function () {
    editor.value = starterCode[this.value];
});

// Reset editor
function resetCode() {
    editor.value = starterCode[document.getElementById("language").value];
    output.innerHTML = `<p class="empty-result">Code reset successfully.</p>`;
}

// Demo test runner
function runTests() {
    output.innerHTML = "";

    const tests = [
        { name: "Test Case 1", input: "[2,7,11,15], target 9", expected: "[0,1]" },
        { name: "Test Case 2", input: "[3,2,4], target 6", expected: "[1,2]" },
        { name: "Test Case 3", input: "[3,3], target 6", expected: "[0,1]" },
        { name: "Test Case 4", input: "[-1,5,2,8], target 7", expected: "[0,3]" }
    ];

    // Demo mode: checking the code text for a basic solution pattern
    const code = editor.value.toLowerCase();

    const looksSolved =
        code.includes("return") &&
        (code.includes("map") ||
         code.includes("for") ||
         code.includes("while") ||
         code.includes("nums") ||
         code.includes("two_sum"));

    tests.forEach((test, index) => {
        const passed = looksSolved && index < 3;

        output.innerHTML += `
            <div class="test-case">
                <span>${test.name} · ${test.input}</span>
                <strong class="${passed ? 'pass' : 'fail'}">
                    ${passed ? '✓ Passed' : '✗ Failed'}
                </strong>
            </div>
        `;
    });

    if (looksSolved) {
        output.innerHTML += `
            <div class="test-case">
                <strong class="pass">Demo evaluation completed.</strong>
            </div>
        `;
    }
}

// Submit solution
function submitCode() {
    const code = editor.value.trim();

    if (code.length < 20) {
        alert("Please write your solution before submitting!");
        return;
    }

    runTests();

    const currentPoints = Number(document.getElementById("points").textContent);
    const currentSolved = Number(document.getElementById("solvedCount").textContent);
    const currentTeamScore = Number(document.getElementById("teamScore").textContent.replace(" XP", ""));

    // Demo scoring
    document.getElementById("points").textContent = currentPoints + 100;
    document.getElementById("solvedCount").textContent = currentSolved + 1;
    document.getElementById("teamScore").textContent = (currentTeamScore + 100) + " XP";

    // Update rank in demo
    document.getElementById("teamRank").textContent = "#1";

    const myTeamRow = document.getElementById("myTeamRow");
    myTeamRow.classList.add("first");
    myTeamRow.querySelector("span").textContent = "🥇";

    alert("🎉 Demo submission successful! +100 XP added to Binary Beasts.");
}

// Create team
function createTeam() {
    const team = prompt("Enter your new squad name:");

    if (team && team.trim() !== "") {
        document.getElementById("teamName").textContent = team;
        document.querySelector(".third strong").textContent = team;
        alert("Team '" + team + "' created successfully!");
    }
}

// Create streak calendar
const calendar = document.getElementById("calendar");

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

days.forEach((day, index) => {
    const div = document.createElement("div");
    div.className = "calendar-day";

    if (index < 5) {
        div.classList.add("done");
        div.textContent = "✓ " + day;
    } else {
        div.textContent = day;
    }

    calendar.appendChild(div);
});
