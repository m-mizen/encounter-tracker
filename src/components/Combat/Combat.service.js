import { generateID } from '../../utils';

export class CombatService {

    /**
     * Saves the combat to disk
     */
    async save() {
        return new Promise((resolve, reject)=>{
            try {
                const id = generateID();
                // save to disk
                return resolve(id);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Load data from disk
     * 
     * @param {String} id 
     */    
    async load(id) {
        return new Promise((resolve, reject)=>{
            try {
                // Load from disk
                const data = {};
                return resolve(data);
            } catch(e) {
                reject(e);
            }
        });
    }
}