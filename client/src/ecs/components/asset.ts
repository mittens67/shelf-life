export class AssetComponent {
  image?: string;
  music?: string;

  constructor(image?: string, music?: string) {
    this.image = image;
    this.music = music;
  }
}