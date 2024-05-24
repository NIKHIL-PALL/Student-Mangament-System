export function isAge(value) {
  return value > 0;
}

export function isName(value) {
  return value.trim() !== "";
}
export function isGrade(grade) {
  let value = grade.toUpperCase();
  return (
    value === "A" ||
    value === "B" ||
    value === "C" ||
    value === "D" ||
    value === "P" ||
    value === "R"
  );
}


