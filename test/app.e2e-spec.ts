/* eslint-disable @typescript-eslint/no-empty-function */

// import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import * as pactum from 'pactum';
// import { PrismaService } from '../src/prisma/prisma.service';
// import { AppModule } from '../src/app.module';
// import { AuthDto } from '../src/auth/dto';
// import { EditUserDto } from 'src/user/dto';
// import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';

// describe('App test', () => {
//   let app: INestApplication;
//   let prisma: PrismaService;
//   /**
//    * Before
//    */
//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();
//     app = moduleRef.createNestApplication();
//     app.useGlobalPipes(
//       new ValidationPipe({
//         whitelist: true,
//       })
//     );

//     await app.init();
//     await app.listen(3333);

//     prisma = app.get(PrismaService);
//     await prisma.cleanDb();
//     pactum.request.setBaseUrl('http://localhost:3333');
//   });
//   /**
//    * After
//    */
//   afterAll(() => {
//     app.close();
//   });

//   /**
//    * AUTH
//    */
//   describe('Auth', () => {
//     const dto: AuthDto = {
//       email: 'vlad@gmail.com',
//       password: '123',
//     };
//     /**
//      * Auth - SIGNUP
//      */
//     describe('Signup', () => {
//       it('should throw if email empty', () => {
//         return pactum
//           .spec()
//           .post('/auth/signup')
//           .withBody({ password: dto.password })
//           .expectStatus(400);
//       });
//       it('should throw if password empty', () => {
//         return pactum
//           .spec()
//           .post('/auth/signup')
//           .withBody({ email: dto.email })
//           .expectStatus(400);
//       });
//       it('should throw if no body provided', () => {
//         return pactum.spec().post('/auth/signup').expectStatus(400);
//       });
//       it('should signup', () => {
//         return pactum
//           .spec()
//           .post('/auth/signup')
//           .withBody(dto)
//           .expectStatus(201);
//         // .inspect();
//       });
//     });
//     /**
//      * Auth - SIGNIN
//      */
//     describe('Signin', () => {
//       it('should throw if email empty', () => {
//         return pactum
//           .spec()
//           .post('/auth/signin')
//           .withBody({ password: dto.password })
//           .expectStatus(400);
//       });
//       it('should throw if password empty', () => {
//         return pactum
//           .spec()
//           .post('/auth/signin')
//           .withBody({ email: dto.email })
//           .expectStatus(400);
//       });
//       it('should throw if no body provided', () => {
//         return pactum.spec().post('/auth/signin').expectStatus(400);
//       });
//       it('should signin', () => {
//         return pactum
//           .spec()
//           .post('/auth/signin')
//           .withBody(dto)
//           .expectStatus(200)
//           .stores('userAccessToken', 'access_token');
//         // .inspect();
//       });
//     });
//   });

//   /**
//    * USER
//    */
//   describe('User', () => {
//     describe('Get me', () => {
//       it('should throw "401 / Unauthorized" if no bearer token on headers', () => {
//         return pactum.spec().get('/users/me').expectStatus(401);
//       });
//       it('should get current user', () => {
//         return pactum
//           .spec()
//           .get('/users/me')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .expectStatus(200);
//       });
//     });
//     describe('Edit user', () => {
//       it('should edit current user', () => {
//         const dto: EditUserDto = {
//           firstName: 'Vladimir',
//           email: 'vlad@gmail.com',
//           lastName: 'Ilich',
//         };
//         return pactum
//           .spec()
//           .patch('/users')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .withBody(dto)
//           .expectStatus(200)
//           .expectBodyContains(dto.firstName)
//           .expectBodyContains(dto.email)
//           .expectBodyContains(dto.lastName);
//         //.inspect();
//       });
//     });
//   });

//   /**
//    * BOOKMARKS
//    */
//   describe('Bookmarks', () => {
//     describe('Get empty bookmarks', () => {
//       it('should get 0 bookmarks', () => {
//         return pactum
//           .spec()
//           .get('/bookmarks')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .expectStatus(200)
//           .expectBody([]);
//       });
//     });
//     describe('Create a bookmark', () => {
//       const dto: CreateBookmarkDto = {
//         title: 'Why talking to strangers can make us smarter',
//         description:
//           "In a suspicious world, many of us are reluctant to interact with strangers. But talking to people we've never met before, even in passing interactions, can make us wiser and happier.",
//         link: 'https://www.bbc.com/future/article/20221026-why-talking-to-strangers-can-make-us-happier',
//       };
//       it('should create new bookmark', () => {
//         return pactum
//           .spec()
//           .post('/bookmarks')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .withBody(dto)
//           .expectStatus(201)
//           .stores('bookmarkId', 'id');
//         // .inspect();
//       });
//     });

//     describe('Get bookmarks', () => {
//       it('should get 1 bookmark', () => {
//         return pactum
//           .spec()
//           .get('/bookmarks')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .expectStatus(200)
//           .expectJsonLength(1);
//       });
//     });

//     describe('Get bookmark by id', () => {
//       it('should get bookmark by Id', () => {
//         return pactum
//           .spec()
//           .get('/bookmarks/{id}')
//           .withPathParams('id', '$S{bookmarkId}')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .expectStatus(200)
//           .expectBodyContains('$S{bookmarkId}');
//       });
//     });

//     describe('Edit bookmark by id', () => {
//       const dto: EditBookmarkDto = {
//         title: 'Why talking to strangers can make us smile.',
//         link: 'https://www.youtube.com/',
//       };
//       it('should edit bookmark by Id', () => {
//         return pactum
//           .spec()
//           .patch('/bookmarks/{id}')
//           .withPathParams('id', '$S{bookmarkId}')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .withBody(dto)
//           .expectStatus(200)
//           .expectBodyContains('$S{bookmarkId}')
//           .expectBodyContains(dto.title)
//           .expectBodyContains(dto.link);
//       });
//     });

//     describe('Delete bookmark by id', () => {
//       it('should delete bookmark by Id', () => {
//         return pactum
//           .spec()
//           .delete('/bookmarks/{id}')
//           .withPathParams('id', '$S{bookmarkId}')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .expectStatus(204)
//           .inspect();
//       });

//       it('should be 0 bookmarks again', () => {
//         return pactum
//           .spec()
//           .get('/bookmarks')
//           .withHeaders({
//             Authorization: 'Bearer $S{userAccessToken}',
//           })
//           .expectStatus(200)
//           .expectBody([])
//           .expectJsonLength(0);
//       });
//     });
//   });
// });
