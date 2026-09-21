import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AdvisersModule } from './advisers/advisers.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProgramsModule } from './programs/programs.module.js';
import { StudentsModule } from './students/students.module.js';

@Module({
  imports: [
    PrismaModule,
    AdvisersModule,
    ProgramsModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}