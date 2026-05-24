import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private storage = inject(Storage);
  private storageReady: Promise<void>;

  constructor() {
    this.storageReady = this.init();
  }


  async init() {
    // Es CRUCIAL inicializar el storage antes de usarlo
    const storage = await this.storage.create();
    this._storage = storage;

    // Solicitar almacenamiento persistente (opcional, pero recomendado)
    if (navigator.storage && navigator.storage.persist) {
      await navigator.storage.persist();
    }
  }

  public async set(key: string, value: any) {
    await this.storageReady;
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    await this.storageReady;
    const value = await this._storage?.get(key);
    return value;
  }

  public async remove(key: string) {
    await this.storageReady;
    await this._storage?.remove(key);
  }
  
}
