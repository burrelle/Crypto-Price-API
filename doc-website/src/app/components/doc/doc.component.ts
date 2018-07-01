import { Component, OnInit, Input } from '@angular/core';
import { Endpoint } from '../../classes/endpoint';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  @Input() endpoint: Endpoint;
  query: string;
  result: string = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.makeQuery();
  }

  makeQuery() {
    this.query = this.endpoint.base_url + this.endpoint.path;
    let first = true;

    for (const param of this.endpoint.params) {
      if (param.example) {
        if (first) {
          this.query += '?';
          first = false;
        } else {
          this.query += '&';
        }

        this.query += param.param_name + '=' + param.example;
      }
    }

    this.api.get(this.query).subscribe(res => {
      this.result = JSON.stringify(res, null, 2);
    },
    error => {
      this.result = JSON.stringify(error, null, 2);
    }
  );
  }
}
