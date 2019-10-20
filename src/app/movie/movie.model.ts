export class Movie {
  title: string;
  year: number;
  img: string;
  imdbID: string;

  constructor(title: string, year: number, img: string, imdbID: string) {
    this.title = title;
    this.year = year;
    this.img = img;
    this.imdbID = imdbID;
  }
}
