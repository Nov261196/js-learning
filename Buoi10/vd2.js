const students = [
    { id: "SV01", name: "An", score: 8.5 },
    { id: "SV02", name: "Bình", score: 4 },
    { id: "SV03", name: "Chi", score: 7 }
];
const viewModels = students.map(({ id, name, score }, index) => ({
    order: index + 1,
    id,
    name: name.toUpperCase(),
    score,
    result: score >= 5 ? "Đạt" : "Chưa đạt"
}));

// console.log(students);
// console.log(viewModels);


const passed = students.filter(({ score }) => score >= 5);
const keyword = "an";
const matched = students.filter(({ name }) =>
    name.toLocaleLowerCase("vi").includes(keyword.toLocaleLowerCase("vi"))
);


// console.log(passed);
// console.log(keyword);
// console.log(matched);


// const found = students.find(({ id }) => id === "SV02");
const found = students.filter(({ score }) => score >= 5);


console.log(found);