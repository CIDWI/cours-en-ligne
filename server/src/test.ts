import {AppDataSource} from "./dataSource";
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
import crypto from "crypto";
import 'dotenv/config';


const test = async () => {
    await AppDataSource.initialize();


    //fixture
    // for run
    //  npx ts-node src/test.ts
    const salt = process.env.SALT!;
    const hashedPassword = crypto
        .createHmac('sha256', salt)
        .update('azerty')
        .digest('hex');

    //init user
    const user1 = new User()
    user1.login = 'user1'
    user1.password = hashedPassword
    user1.role = 'user'
    user1.firstName = 'Benjamin'
    user1.lastName = 'Zaoui';

    await userRepository.save(user1)

    const user2 = new User()
    user2.login = 'user2'
    user2.password = hashedPassword
    user2.role = 'user'
    user2.firstName = 'Aaron'
    user2.lastName = 'Saada';

    await userRepository.save(user2)

    const user3 = new User()
    user3.login = 'admin'
    user3.password = hashedPassword
    user3.role = 'admin'
    user3.firstName = 'Yoel'
    user3.lastName = 'Sillam'

    await userRepository.save(user3)

//init course
    const course1 = new Course()
    course1.title = "Introduction au HTML";

    await courseRepository.save(course1);

    const course2 = new Course()
    course2.title = "Introduction au CSS";

    await courseRepository.save(course2);

    const course3 = new Course()
    course3.title = "Introduction au JavaScript";

    await courseRepository.save(course3);

    //init Chapitre
    const chapter1 = new Chapter()
    chapter1.title = 'Les balises de texte, titre et lien'
    chapter1.course = course1;
    await chapterRepository.save(chapter1)

    const chapter2 = new Chapter()
    chapter2.title = 'Introduction au CSS & son ajout au HTML'
    chapter2.course = course2;

    await chapterRepository.save(chapter2)

    const chapter3 = new Chapter()
    chapter3.title = 'Introduction au JavaScript'
    chapter3.course = course3;

    await chapterRepository.save(chapter3)

    //                  LESSONS                 //

    // Chapitre 1
    const lesson1 = new Lesson()
    lesson1.title = 'Les balises de bases du HTML'
    lesson1.level = '1'
    lesson1.languages = 'HTML'
    lesson1.chapter = chapter1;
    lesson1.link = 'https://www.youtube.com/watch?v=GBIIQ0kP15E'

    await lessonRepository.save(lesson1)

    const lesson2 = new Lesson()
    lesson2.title = 'Les différents types de balises'
    lesson2.level = '1'
    lesson2.languages = 'HTML'
    lesson2.chapter = chapter1;
    lesson2.link = 'https://www.youtube.com/watch?v=GBIIQ0kP15E'

    await lessonRepository.save(lesson2)


    // Chapitre 2

    const lesson3 = new Lesson()
    lesson3.title = 'Ajout de style en HTML grâce au CSS'
    lesson3.level = '1'
    lesson3.languages = 'CSS'
    lesson3.chapter = chapter2;
    lesson3.link = 'https://www.youtube.com/watch?v=GBIIQ0kP15E'

    await lessonRepository.save(lesson3)


    // Chapitre 3

    const lesson4 = new Lesson()
    lesson4.title = 'Introduction au concept des variables'
    lesson4.level = '2'
    lesson4.languages = 'JavaScript'
    lesson4.chapter = chapter3;
    lesson4.link = 'https://www.youtube.com/watch?v=GBIIQ0kP15E'

    await lessonRepository.save(lesson4)

    //                  Exercices                   //

    //init exercice
    const exercise1 = new Exercise()
    exercise1.title = 'Exercise 1'
    exercise1.content = 'Reproduisez cette image'
    exercise1.imageLink = '/image/img.png'
    exercise1.lesson = lesson1

    await exerciseRepository.save(exercise1)

    const exercise2 = new Exercise()
    exercise2.title = 'Exercise 2'
    exercise2.content = 'Reproduisez cette image'
    exercise2.imageLink = '/image/img.png'
    exercise2.lesson = lesson2

    await exerciseRepository.save(exercise2)

    const exercise3 = new Exercise()
    exercise3.title = 'Exercise 3'
    exercise3.content = 'Reproduisez cette vidéo'
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
    process.exit(0)

};
test();
