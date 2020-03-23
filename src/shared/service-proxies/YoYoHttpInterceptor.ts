import { AbpHttpInterceptor } from "abp-ng2-module/dist/src/abpHttpInterceptor";
import { HttpRequest, HttpHeaders } from "@angular/common/http";

export class YoYoHttpInterceptor extends AbpHttpInterceptor {
    protected addAspNetCoreCultureHeader(headers: HttpHeaders): HttpHeaders {
        let cookieLangValue = abp.localization.currentLanguage.name;

        if (cookieLangValue && headers && !headers.has('.AspNetCore.Culture')) {
            headers = headers.set('.AspNetCore.Culture', cookieLangValue);
        }

        return headers;
    }
}