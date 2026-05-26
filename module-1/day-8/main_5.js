let students = [
    {
        name: "MK",
        age: 18,
    },
    {
        name: "An",
        age: 20,
    },
    {   
        name: "Binh",
        age: 22,
    }
];


function findOldest(students){
    let oldest = students[0];
    for ( let i = 1; i < students.length; i++){
        if(students[i].age > oldest.age){
            oldest = students[i];
        }
    }
    return  oldest;
}

console.log(findOldest(students));
