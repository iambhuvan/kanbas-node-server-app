import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
 

// export function createModule(module) {
//   const newModule = { ...module, _id: Date.now().toString() };
//   Database.modules = [...Database.modules, newModule];
//   return newModule;
// }

// export function deleteModule(moduleId) {
//   const { modules } = Database;
//   Database.modules = modules.filter((module) => module._id !== moduleId);
//  }