import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd  } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { map, filter, scan } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  label = '';
  descripcion = '';
  autor = environment.AUTOR_NAME;
  keywords = environment.KEYWORDS;

  /**
   * La "data.description" sale del archivo pages.routes.ts donde se configuran las rutas
   * @param router
   * @param title
   * @param meta
   */
  constructor( private router: Router,
               private title: Title,
               private meta: Meta,
               ) {

    this.getDataRoute()
      .subscribe(data => {
          // console.log(data);
            if (data && data.titulo !== undefined) {
            this.label = data.titulo;
            this.descripcion = data.description !== undefined ? data.description : data.titulo;
            this.title.setTitle( this.label );

            this.addMetaTag('description', this.descripcion);
            this.addMetaTag('author', this.autor);
            this.addMetaTag('keywords', this.keywords );
          }
        });

  }

  addMetaTag(property: string, value: any) {
    const metaTag: MetaDefinition = {
            name: property,
            content: value
          };

    this.meta.updateTag(metaTag);
  }

  /**
   * Obtener la ruta donde estoy, la "data" se configura en los routes(pages.routes.ts)
   *
   */
  getDataRoute() {
    return this.router.events
      .pipe(
        filter( evento => evento instanceof ActivationEnd ),
        map( (evento: ActivationEnd) => {
        return evento.snapshot.data;
      })
      );
  }



  ngOnInit() {
  }

}
