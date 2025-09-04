// Simple localStorage-backed storage for teacher features.
// Keeps data under keys prefixed with `shk_` to avoid collisions.

export function _read(key) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("storage read error", e);
    return null;
  }
}

export function _write(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("storage write error", e);
  }
}

const KEYS = {
  CLASSROOMS: "shk_classrooms",
  CONTENT: "shk_content",
  STUDENTS: "shk_students",
  MISSIONS: "shk_missions",
  ATTENDANCE: "shk_attendance",
};

// Classrooms
export function getClassrooms() {
  return _read(KEYS.CLASSROOMS) || [];
}

export function addClassroom(obj) {
  const cur = getClassrooms();
  cur.push(obj);
  _write(KEYS.CLASSROOMS, cur);
  return obj;
}

// Content
export function getContent() {
  return _read(KEYS.CONTENT) || [];
}

export function addContent(obj) {
  const cur = getContent();
  cur.push(obj);
  _write(KEYS.CONTENT, cur);
  return obj;
}

// Students
export function getStudents() {
  return _read(KEYS.STUDENTS) || [];
}

export function addStudent(obj) {
  const cur = getStudents();
  cur.push(obj);
  _write(KEYS.STUDENTS, cur);
  return obj;
}

export function updateStudent(id, patch) {
  const cur = getStudents();
  const idx = cur.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  cur[idx] = { ...cur[idx], ...patch };
  _write(KEYS.STUDENTS, cur);
  return cur[idx];
}

export function deleteStudent(id) {
  const cur = getStudents();
  const next = cur.filter((s) => s.id !== id);
  _write(KEYS.STUDENTS, next);
  return next;
}

// Missions
export function getMissions() {
  return _read(KEYS.MISSIONS) || [];
}

export function addMission(obj) {
  const cur = getMissions();
  cur.push(obj);
  _write(KEYS.MISSIONS, cur);
  return obj;
}

// Attendance (simple records)
export function getAttendance() {
  return _read(KEYS.ATTENDANCE) || [];
}

export function addAttendance(record) {
  const cur = getAttendance();
  cur.push(record);
  _write(KEYS.ATTENDANCE, cur);
  return record;
}
