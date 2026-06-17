const average = (numbers) => {
    let status = {};

    for (const student of students) {
        let total = 0;
        for (const score of student.scores) {
            total += score;
        }
        const averageScore = total / student.scores.length;
        status[student.id] = averageScore;
        if (averageScore >= 8) {
            status[student.id] = "Gioi";
        } else if (averageScore >= 6.5) {
            status[student.id] = "Kha";
        } else if (averageScore >= 5) {
            status[student.id] = "Trung Binh";
        } else {
            status[student.id] = "Yeu";
        }
    }
    return status;
}

const students = [
    { id: "SV01", name: "An", scores: [8, 7, 9] },
    { id: "SV02", name: "Binh", scores: [4, 3, 5] },
    { id: "SV03", name: "Cuong", scores: [6, 7, 5] },
    { id: "SV04", name: "Dung", scores: [9, 8, 10] }
];

console.log(average(students));
