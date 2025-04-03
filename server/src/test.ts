import { AppDataSource } from "./dataSource";
import {User} from "./modules/user/userEntity";
import {userRepository} from "./modules/user/userRepository";
import {Chapter} from "./modules/chapter/chapterEntity";
import {Lesson} from "./modules/lesson/lessonEntity";
import {lessonRepository} from "./modules/lesson/lessonRepository";
import {Exercise} from "./modules/exercise/exerciseEntity";
import {Advancement} from "./modules/advancement/advancementEntity";
import {exerciseRepository} from "./modules/exercise/exerciseRepository";
import {chapterRepository} from "./modules/chapter/chapterRepository";
import {advancementRepository} from "./modules/advancement/advancementRepository";
import {Course} from "./modules/cours/courseEntity";
import {courseRepository} from "./modules/cours/courseRepository";


const test = async () => {
  await AppDataSource.initialize();


  //jeu d'essaie



  //init user
  const user1 = new User()
  user1.login = 'user1'
  user1.password = 'azerty'
  user1.role = 'user';

  await userRepository.save(user1)

  const user2= new User()
  user2.login = 'user2'
  user2.password = 'azerty'
  user2.role = 'user';

  await userRepository.save(user2)

  const user3 = new User()
  user3.login = 'admin'
  user3.password = 'azerty'
  user3.role = 'admin';

  await userRepository.save(user3)

//init course
  const course1 = new Course()
  course1.title = "Course 1";

  await courseRepository.save(course1);

  const course2 = new Course()
  course2.title = "Course 2";

  await courseRepository.save(course2);

   //init Chapitre
  const chapter1 = new Chapter()
  chapter1.title = 'Les bases HTML'
  chapter1.course = course1;
  await chapterRepository.save(chapter1)

  const chapter2 = new Chapter()
  chapter2.title = 'Ajouts de CSS'
  chapter1.course = course1;

  await chapterRepository.save(chapter2)

  const chapter3 = new Chapter()
  chapter3.title = 'Dynamisation avec JS'
  chapter3.course = course2;

  await chapterRepository.save(chapter3)



  //init lesson
  const lesson1 = new Lesson()
  lesson1.title = 'Lesson 1'
  lesson1.level = '1'
  lesson1.languages = 'CSS'
  lesson1.chapter = chapter2;
  lesson1.link = 'https://www.youtube.com/watch?v=GBIIQ0kP15E'


  await lessonRepository.save(lesson1)

  const lesson2 = new Lesson()
  lesson2.title = 'Lesson 2'
  lesson2.level = '2'
  lesson2.languages = 'CSS'
  lesson2.chapter = chapter2;
  lesson2.link = 'https://www.youtube.com/watch?v=GBIIQ0kP15E'


  await lessonRepository.save(lesson2)

  const lesson3 = new Lesson()
  lesson3.title = 'Lesson 3'
  lesson3.level = '3'
  lesson3.languages = 'JS'
  lesson3.chapter = chapter1;
  lesson3.link = 'https://www.youtube.com/watch?v=GBIIQ0kP15E'


  await lessonRepository.save(lesson3)




  //init exercice
  const exercise1 = new Exercise()
  exercise1.title = 'Exercise 1'
  exercise1.content = 'reproduisez cette image'
  exercise1.imageLink = '/image/img.png'
  exercise1.lesson = lesson1

  await exerciseRepository.save(exercise1)

  const exercise2 = new Exercise()
  exercise2.title = 'Exercise 2'
  exercise2.content = 'reproduisez cette image'
  exercise2.imageLink = '/image/img.png'
  exercise2.lesson = lesson2

  await exerciseRepository.save(exercise2)

  const exercise3 = new Exercise()
  exercise3.title = 'Exercise 3'
  exercise3.content = 'reproduisez cette vidéo'
  exercise3.imageLink = '/image/img.png'
  exercise3.lesson = lesson3

  await exerciseRepository.save(exercise3)



  //init avancement
  const advancement1 = new Advancement()
  advancement1.isDone = false
  advancement1.lesson = lesson1
  advancement1.user = user2
  await advancementRepository.save(advancement1)

  const advancement2 = new Advancement()
  advancement2.isDone = true
  advancement2.lesson = lesson2
  advancement2.user = user1
  await advancementRepository.save(advancement2)

};
test();
