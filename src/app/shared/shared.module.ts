import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { CardModule } from "primeng/card";
import { TabMenuModule } from "primeng/tabmenu";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CardComponent } from "./components/card/card.component";
import { ApiService } from "./services/core/api.service";
import { AppUtilsService } from "./services/core/app-utils.service";
import { ConfigService } from "./services/config.service";
import { TabMenuComponent } from "./components/tabmenu/tabmenu.component";
import { TableLayoutComponent } from "./components/table-layout/table-layout.component";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { EllipsisPipe } from "./pipes/ellipsis.pipe";
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { PaginatorModule } from "primeng/paginator";
import { LoaderComponent } from "./components/loader/loader.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { NotificationService } from "./services/core/notification.service";
import { ExportExcelService } from "./services/core/export-excel.service";
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from "primeng/tabview";
import { SearchTableLayoutComponent } from './components/search-table-layout/search-table-layout.component';
import { SplitAndCapitalizePipe } from './pipes/split-and-capitalize.pipe';
import { ChatService } from "./services/core/chat.service";

@NgModule({
  declarations: [
    BreadcrumbComponent,
    CardComponent,
    TabMenuComponent,
    TableLayoutComponent,
    EllipsisPipe,
    PaginatorComponent,
    LoaderComponent,
    SearchTableLayoutComponent,
    SplitAndCapitalizePipe
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    CardModule,
    CardModule,
    TabMenuModule,
    TableModule,
    TagModule,
    PaginatorModule,
    ProgressSpinnerModule,
    AccordionModule,
    TabViewModule
  ],
  providers: [
    ApiService,
    AppUtilsService,
    ConfigService,
    NotificationService,
    ExportExcelService,
    ChatService
  ],
  exports: [
    BreadcrumbComponent,
    CardComponent,
    TabMenuComponent,
    TableLayoutComponent,
    PaginatorComponent,
    LoaderComponent,
    SearchTableLayoutComponent,
    SplitAndCapitalizePipe
  ],
})
export class SharedModule {}
