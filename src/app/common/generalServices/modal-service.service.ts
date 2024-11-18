import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ModalServiceService {

    private idJquery: string = "";

    constructor() { }

    abrirModal(id: string) {
        this.idJquery = `#${id}`;
        let modal = new (window as any).bootstrap.Modal(this.idJquery);
        modal.show()
    }
    cerarModal(id: string) {
        this.idJquery = `#${id}`;
        let modal = new (window as any).bootstrap.Modal(this.idJquery);
        modal.hide()
    }
}