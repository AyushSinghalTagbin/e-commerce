import { Body, Controller, Get, Header, Inject, Post, Render, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from '@nestjs/common';
import { ShopperLocalAuthGuard } from './auth/shopper-local-auth.gaurd' ;
import { ShopperAuthService } from './auth/shopper-auth.service';
import { ShopperJwtAuthGuard }  from './auth/shopper-jwt-auth.gaurd' ;
import { SellerLocalAuthGuard } from './auth/seller-local-auth.gaurd' ;
import { SellerAuthService } from './auth/seller-auth.service';
import { SellerJwtAuthGuard } from './auth/seller-jwt-auth.gaurd';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: ShopperAuthService,
    private readonly sellerAuthService: SellerAuthService,
    // @Inject('HELLO_SERVICE') private readonly client: ClientProxy
  ) {}

  @Get()
async getResponse(): Promise<any> {
  // await this.client.emit<any>('message_printed', { text: 'ayush' });
  return { name: 'ayush' };
}

   
  

  @Post('login/')
  @Render('login')
  chooseRole(@Res() res, @Body() role: string) {
    if(role=='shopper')    
        return res.redirect('/login/shopper') ;
    else
        return res.redirect('/login/seller') ;
  }
  
  // @Get()
  // @Render('index.hbs')
  // getHelloMessage() {
  //   return { result: 'Hello Real world!' } ;
  // }
  
  @UseGuards(ShopperLocalAuthGuard)
  @Post('login/shopper')
  async shopperLogin(@Request() req) {
    const resp = this.authService.login(req.user) ;
    console.log(resp) ;
    return resp
  }

  @UseGuards(SellerLocalAuthGuard) 
  @Post('login/seller')
  async sellerLogin(@Request() req) {
    const resp = this.sellerAuthService.login(req.user) ;
    console.log(resp)
    return  resp;
  }
  
  @UseGuards(ShopperJwtAuthGuard) 
  @Get('profile/shopper')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(SellerJwtAuthGuard) 
  @Get('profile/seller')
  getSellerProfile(@Request() req) {
    return req.user ;
  }


}


