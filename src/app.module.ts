import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AdvisersModule } from './advisers/advisers.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProgramsModule } from './programs/programs.module.js';
import { StudentsModule } from './students/students.module.js';
import { SubjectsModule } from './subjects/subjects.module.js';
import { RemarksModule } from './remarks/remarks.module.js';
import { EnrolmentsModule } from './enrolments/enrolments.module.js';

@Module({
  imports: [
    PrismaModule,
    AdvisersModule,
    ProgramsModule,
    StudentsModule,
    SubjectsModule,
    RemarksModule,
    EnrolmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}