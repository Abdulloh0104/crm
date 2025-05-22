// import {
//   BadRequestException,
//   ConflictException,
//   ForbiddenException,
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { SignInDto } from "../dto/sign-in.dto";
// import * as bcrypt from "bcrypt";
// import { Response } from "express";
// import { PatientService } from "../../patient/patient.service";
// import { CreatePatientDto } from "../../patient/dto/create-patient.dto";
// import { Patient } from "../../patient/models/patient.model";

// @Injectable()
// export class AuthPatientService {
//   constructor(
//     private readonly usersService: PatientService,
//     private readonly jwtService: JwtService
//   ) {}

//   async generateTokens(user: Patient) {
//     const payload = {
//       id: user.id,
//       email: user.email,
//       is_active: user.is_active,
//       role: "patient",
//     };

//     const [accessToken, refreshToken] = await Promise.all([
//       this.jwtService.signAsync(payload, {
//         secret: process.env.ACCESS_TOKEN_KEY,
//         expiresIn: process.env.ACCESS_TOKEN_TIME,
//       }),
//       this.jwtService.signAsync(payload, {
//         secret: process.env.REFRESH_TOKEN_KEY,
//         expiresIn: process.env.REFRESH_TOKEN_TIME,
//       }),
//     ]);
//     return {
//       accessToken,
//       refreshToken,
//     };
//   }

//   async signUp(createUserDto: CreatePatientDto) {
//     const candidate = await this.usersService.findPatientByEmail(
//       createUserDto.email
//     );

//     if (candidate) {
//       throw new ConflictException("Bunday emailli foydalanuvchi mavjud");
//     }

//     const newUser = await this.usersService.create(createUserDto);
//     return { message: "Foydalanuvchi qo'shildi", userId: newUser.id };
//   }

//   async signIn(signInDto: SignInDto, res: Response) {
//     const user = await this.usersService.findPatientByEmail(signInDto.email);
//     if (!user) {
//       throw new BadRequestException("Email yoki password notog'ri");
//     }

//     if (!user.is_active) {
//       throw new BadRequestException("Avval emailni tasdiqlang");
//     }

//     const isValidPassword = await bcrypt.compare(
//       signInDto.password,
//       user.password
//     );
//     if (!isValidPassword) {
//       throw new BadRequestException("Email yoki Password notog'ri");
//     }

//     const { accessToken, refreshToken } = await this.generateTokens(user);
//     res.cookie("patient_refresh_token", refreshToken, {
//       httpOnly: true,
//       maxAge: Number(process.env.COOKIE_TIME),
//     });
//     user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
//     await user.save();
//     return {
//       message: "Tizimga hush kelibsiz",
//       accessToken,
//     };
//   }

//   async signOut(refreshToken: string, res: Response) {
//     const userData = await this.jwtService.verify(refreshToken, {
//       secret: process.env.REFRESH_TOKEN_KEY,
//     });
//     if (!userData) {
//       throw new ForbiddenException("User not verified");
//     }

//     const hashed_refresh_token = null;
//     await this.usersService.updateRefreshToken(
//       userData.id,
//       hashed_refresh_token!
//     );

//     res.clearCookie("patient_refresh_token");
//     const response = {
//       message: "User logged out seccessfully",
//     };
//     return response;
//   }

//   async refreshToken(userId: number, refresh_token: string, res: Response) {
//     const decodedToken = await this.jwtService.decode(refresh_token);

//     if (userId !== decodedToken["id"]) {
//       throw new ForbiddenException("Ruxsat etilmagan");
//     }
//     const user = await this.usersService.findOne(userId);

//     if (!user || !user.hashed_refresh_token) {
//       throw new NotFoundException("user not found");
//     }

//     const tokenMatch = await bcrypt.compare(
//       refresh_token,
//       user.hashed_refresh_token
//     );
//     if (!tokenMatch) {
//       throw new ForbiddenException("Forbidden");
//     }
//     const { accessToken, refreshToken } = await this.generateTokens(user);

//     const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
//     await this.usersService.updateRefreshToken(user.id, hashed_refresh_token);

//     res.cookie("patient_refresh_token", refreshToken, {
//       maxAge: Number(process.env.COOKIE_TIME),
//       httpOnly: true,
//     });

//     const response = {
//       message: "User refreshed",
//       userId: user.id,
//       access_token: accessToken,
//     };
//     return response;
//   }
// }
