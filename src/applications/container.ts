import ClassRepo from "@/infrastructure/local/repo/class.repo";
import { AuthService } from "./services/auth.service";
import ClassService from "./services/class.service";
import { classData } from "@/infrastructure/local/db/data";
import StudentRepo from "@/infrastructure/local/repo/student.repo";
import StudentService from "./services/student.service";
import TeacherRepo from "@/infrastructure/local/repo/teacher.repo";
import TeacherService from "./services/teacher.service";

const classRepoLocal = new ClassRepo(classData);
const studentRepositoryLocal = new StudentRepo()
const teacherRepoLocal = new TeacherRepo()


export const authService = new AuthService();
export const classService = new ClassService(classRepoLocal, studentRepositoryLocal, teacherRepoLocal);
export const studentService = new StudentService(studentRepositoryLocal)
export const teacherService = new TeacherService(teacherRepoLocal, classRepoLocal)