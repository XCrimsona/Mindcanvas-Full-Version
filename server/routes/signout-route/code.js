// 1️⃣ Create a Map to track canvas names by their owner
const canvasMap = new Map();

// Add entries
canvasMap.set("user1", ["Wedding Canvas", "Project Canvas"]);
canvasMap.set("user2", ["Work Canvas"]);

// Get entries
console.log(canvasMap.get("user1")); // ["Wedding Canvas", "Project Canvas"]

// Check if a user exists
console.log(canvasMap.has("user2")); // true

// Delete a user
canvasMap.delete("user2");

// Iterate over Map
for (const [user, canvases] of canvasMap) {
    console.log(user, canvases);
}

// Map size
console.log(canvasMap.size); // 1