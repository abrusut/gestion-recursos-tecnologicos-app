import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivationEnd, RoutesRecognized, NavigationEnd  } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { map, filter, scan, pairwise } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RouterExtService } from 'src/app/services/shared/RouterExtService';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-breadcrumpng',
  templateUrl: './breadcrumpng.component.html',
  styleUrls: ['./breadcrumpng.component.scss']
})
export class BreadcrumpngComponent implements OnInit {

  items: MenuItem[] = [];

  label = '';
  descripcion = '';
  url = '';
  autor = environment.AUTOR_NAME;
  keywords = environment.KEYWORDS;
  home: MenuItem;

   /**
   * La "data.description" sale del archivo pages.routes.ts donde se configuran las rutas
   * @param router
   * @param title
   * @param meta
   */
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    private routerService: RouterExtService
  ) {
    this.getDataRoute().subscribe(snapshot => {
      const data = snapshot.data;
      const pathPrevio = data.pathPrevio;
      // console.log(data);
      if (data && data.titulo !== undefined) {
        this.label = data.titulo;
        this.descripcion =
            data.description !== undefined ? data.description : data.titulo;
        this.url = data.path;
        this.title.setTitle(this.label);

        let yaExiste = false;
        this.items.forEach(element => {
          if (element['label'] === this.label ) {
            yaExiste = true;
          }
        });

        if ( !yaExiste ) {
          this.items = [
            { label: 'Home', url: '/#/dashboard' },
            //{ label: 'Dashboard', url: 'dashboard' }
          ];
          this.home = {icon: 'pi pi-home', url: '/#/dashboard'};

          if (pathPrevio !== null && pathPrevio !== undefined) {
            if (pathPrevio.label !== null && pathPrevio.label !== undefined
              && pathPrevio.path !== null && pathPrevio.path !== undefined ) {
                  // add route previa
                  this.items.push( {label : pathPrevio.label, url: pathPrevio.path} );
              }
          }

          // add current route
          this.items.push( {label : this.label, url: this.url} );
        }
        this.addMetaTag('description', this.descripcion);
        this.addMetaTag('author', this.autor);
        this.addMetaTag('keywords', this.keywords);
      }
    });
  }

  ngOnInit() {
  }

  /**
   * Agrega Meta Tag al Index.html del sitio para los buscadores
   * @param property
   * @param value
   */

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
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      map((evento: ActivationEnd) => {
        // return evento.snapshot.data;
        return evento.snapshot;
      })
    );
  }

  get previousRoute$(): Observable<string> {
    return this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      pairwise(),
      map((e: [RoutesRecognized, RoutesRecognized]) => e[0].url)
    );
  }
}
