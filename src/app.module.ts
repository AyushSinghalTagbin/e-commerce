import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm' ;
import { User } from './Users/user.entity';
import { Products  } from './Products/products.entity';
import { Orders  } from './Orders/orders.entity';
import { UserModule } from './Users/user.module';
import { ProductsModule } from './Products/products.module';
import { ProductCategory } from './Products/product_categories.entity';
import { OrdersModule } from './Orders/orders.module' ;
import { TrackOrder } from './Tracking/trackOrder.entity';
import { OrderDetails } from './Orders/orderdetails.entity';
import { TrackerModule } from './Tracking/trackOrder.module';
import { ProductReviews } from './Products/product.reviews.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller' ;
import { AppService } from './app.service';
import { WishListModule } from './wishlist/wishlist.module';
import { WishList } from './wishlist/wishlist.entity';
import { Seller } from './Users/seller.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Transport, ClientsModule } from '@nestjs/microservices';

const dotenv = require('dotenv') ;
dotenv.config() ;

@Module({
  imports: [
    
    ProductsModule,

    UserModule,

    OrdersModule,  

    TrackerModule,

    AuthModule,

    WishListModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'e-commerce.cluster-cnwe40c6ymlp.ap-south-1.rds.amazonaws.com',                                                 
      port: 3306,
      username: 'admin',
      password: ']9+36KJ3yw>0FbJLCTch}x_4-7t|',
      database: 'ecommerce',
      entities: [ Products, User , ProductCategory, TrackOrder, OrderDetails, Orders , ProductReviews, WishList, Seller ],
      migrations: [Products, User , ProductCategory, TrackOrder, OrderDetails, Orders , ProductReviews, WishList, Seller],
      synchronize: true,
    }),
    // ClientsModule.register([
    //   {
    //     name: 'HELLO_SERVICE', transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://admin:admin@localhost:5672/hello'],
    //       queue: 'user-messages',
    //       queueOptions: {
    //         durable: false
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ], 
})


export class AppModule {}
// controller -> handle requests and send back replies
// providers -> service reaches to DB and renders to controller
// modularity

