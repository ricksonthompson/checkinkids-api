import { Module } from "@nestjs/common";
import { ChildrenRepository } from "../repositories/children/children.repository";
import { ChildrenController } from "../controllers/children.controller";
import { ChildrenService } from "../services/children.service";
import { ResponsibleModule } from "./responsible.module";

@Module({
  imports: [ResponsibleModule],
  controllers: [ChildrenController],
  providers: [
    ChildrenService,
    {
      provide: "IChildrenRepository",
      useClass: ChildrenRepository
    }
  ],
  exports: [ChildrenService]
})

export class ChildrenModule { }
