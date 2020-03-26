import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'group' })


export class Group implements PipeTransform {
    transform(value): string {
        if (value == 0) {
            return '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC0ElEQVR4Xu2avYsTQRTA39t4neBl1wPB5poomNI/wUIQFCw8EC0OLFQCKQQFC7nEQrCw8LzdpBA8ECwsDk4QLPwTrlVJZg8PCxu5iGDj4c6TzXl6gd1kP2Z2Z3cn7WQn7/eb9+Zrg1DxD1acH7QAnQEVN6BLoOIJoCdBXQK6BCpm4OgqWziC0Jwz9ra+tZo/K1UCxx33LAfa+jvmX7kH1yojwFobnCPDeD+Z8LhTCQHmM3YeavAuqNpLL6De376AnL8Nm+pKLWDeYZcMgM3QeZ54t7QCrJ57mYg2psGPWqc7pRRgOuwKALyeBe+3l05A3R5eRcRXUeBLJ8By2HUCeBkVvlQCLHu4TIgv4sCXRoDZZzeAw/O48KUQUO+5N5GonwS+8AIsh7UIYC0pfKEFWD23TURP08AXVoDpsDsA8CQtfCEF1O3hPUR8LAJ+LMDqDU4S1VYJyESi756Hd3+0G9sq3pNYDrtPAI9Ewe8LcNgbArh4qNMPYMDS6Fbjo0oSTHv4ABAfioQfCzAdRgGdKiXBtAcdQGNFNPw0AX6bEhJkwoeVwGHRuUqQDb+fAX12Bvj46NgMSbFcJGQB/28ZVE1CVvAT+wBVJMyER+iMbje6olaoiQuRvCVkDR+4E8xLQh7woVvhrCXkBT/1LJCVhDzhZx6GZEvIG36mAP8LsiSoAB9JgAwJqsBHFiBSgkrwsQSIkKAafGwBaSSoCJ9IQBIJqsInFhBHAnh8aeplhuC9fdwzQqqXo5GWyPBjtv9qVujBJi58qgw4+LEIEoLjUgBeiICI5TApQRF4YQJiSVAIXqiASBKId/2/pSSpVVnPpJoEg4Ka731aNGBuBYiW/7fjDhLv7rZOrcsCSdqvcAEHgSzYn094+HuxZhi7x/b4F7fd+JU0SJnPSRMgM2iRfWsBIm0WsS+dAUUcNZEx6wwQabOIfekMKOKoiYy58hnwB8iXrnXRk1JGAAAAAElFTkSuQmCC" alt="" width="14" height="14">'
        } else  if (value == 1) {
            return '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC70lEQVR4XuXbvW7TUBjG8ectbXIFMFGXoVGSjUuAlS+xtBITl9J0YuEKOjLSBVHECtwBCzStQIAzVIIriCP1VEntJE38cT7f42M6VVWs5P/z6/TYlgn/+Q9N+4fbW59AdJ+AdyA67v4Zf2yiy9lO+xGE2BPAcwjxtTeaPMwA/oLo9lL0fi9OjpuEMIxaewDezpuE+NcbTe5cA0St9wCergQ3BmEtfhoqxOf5BJzvtB9fCvEhZ48Hj5AbD4AgXnbjyZvZBKRTcHNEFhrBIhTFC+CwHyeDaeIcoGkIMvFrAE1BkI3PBQgdQSW+ECBUBNX4UoDQEHTiKwFCQdCNlwKoO4JJvDRAXRFM45UA6oZgI14ZoC4ItuK1AHwj2IzXBvCFYDveCIAbwUW8MQAXQvEpLQbdODlcnLiq/3bjbFB98+stij4gAONTaZfxViYgQ3OB4DreKoDtSeCItw5gC4Er3gmAKQJnvDMAXQTueKcAqgg+4p0DyCL4imcBqEJI/40u7tikfyCYL3Jk1jVWFkIyb1SyTljbnCuebQIkFktzBM54doCKw2F6l8Z4bS8zjcuvYTsEqqaAgG8bwH4nTr6rRpi8nhWg6nvABwIbQFV8the5EVgAyi5mpF9EByvHJdvh4BxA5krOadQaEOAFwSmATHy2530hOANQifeJ4ARAJ94XgnUAk3gfCFYBbMRzI1gDsBnPiWAFwEU8F4IxgMt4DgQjAI541wjaAJzxLhG0AHzEu0JQBvAZ7wJBCaAO8bYRpAHqFG8TQQqgjvG2ECoB6hxvA6EUIIR4U4RCgJDiTRByAUKM10VYAwg5XgdB6pGZ5WdsTG5CcG4re42x8qGpEONVJmEGcB61n1xCnKzuoZDjyxAAnPTi5Fl6TyL/wckmxJdOwgb63d/JcDYBw6j1C8C9bIMmxRch3BK02xmNf84Azra3XguiFwAuBMRRP54ccX5hcb3X6d3NB0R0IIi+bLaSV50fGFcuhbk+nK/3uQKu6aFfbfms6AAAAABJRU5ErkJggg==" alt="" width="14" height="14">'
        } else  if (value == 2) {
            return '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC70lEQVR4XuXbvW7TUBjG8ectbXIFMFGXoVGSjUuAlS+xtBITl9J0YuEKOjLSBVHECtwBCzStQIAzVIIriCP1VEntJE38cT7f42M6VVWs5P/z6/TYlgn/+Q9N+4fbW59AdJ+AdyA67v4Zf2yiy9lO+xGE2BPAcwjxtTeaPMwA/oLo9lL0fi9OjpuEMIxaewDezpuE+NcbTe5cA0St9wCergQ3BmEtfhoqxOf5BJzvtB9fCvEhZ48Hj5AbD4AgXnbjyZvZBKRTcHNEFhrBIhTFC+CwHyeDaeIcoGkIMvFrAE1BkI3PBQgdQSW+ECBUBNX4UoDQEHTiKwFCQdCNlwKoO4JJvDRAXRFM45UA6oZgI14ZoC4ItuK1AHwj2IzXBvCFYDveCIAbwUW8MQAXQvEpLQbdODlcnLiq/3bjbFB98+stij4gAONTaZfxViYgQ3OB4DreKoDtSeCItw5gC4Er3gmAKQJnvDMAXQTueKcAqgg+4p0DyCL4imcBqEJI/40u7tikfyCYL3Jk1jVWFkIyb1SyTljbnCuebQIkFktzBM54doCKw2F6l8Z4bS8zjcuvYTsEqqaAgG8bwH4nTr6rRpi8nhWg6nvABwIbQFV8the5EVgAyi5mpF9EByvHJdvh4BxA5krOadQaEOAFwSmATHy2530hOANQifeJ4ARAJ94XgnUAk3gfCFYBbMRzI1gDsBnPiWAFwEU8F4IxgMt4DgQjAI541wjaAJzxLhG0AHzEu0JQBvAZ7wJBCaAO8bYRpAHqFG8TQQqgjvG2ECoB6hxvA6EUIIR4U4RCgJDiTRByAUKM10VYAwg5XgdB6pGZ5WdsTG5CcG4re42x8qGpEONVJmEGcB61n1xCnKzuoZDjyxAAnPTi5Fl6TyL/wckmxJdOwgb63d/JcDYBw6j1C8C9bIMmxRch3BK02xmNf84Azra3XguiFwAuBMRRP54ccX5hcb3X6d3NB0R0IIi+bLaSV50fGFcuhbk+nK/3uQKu6aFfbfms6AAAAABJRU5ErkJggg==" alt="" width="14" height="14">'
        }

    }
}