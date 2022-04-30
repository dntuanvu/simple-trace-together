import { Controller, Get, Post, Patch, Delete, Request, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class HomeController {

    @UseGuards(JwtAuthGuard)
    @Get('user-info') 
    getUserInfo(@Request() req) {
        return req.user; 
    }
}