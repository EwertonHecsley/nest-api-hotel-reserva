import Identity from './generic.identity';

export default abstract class Entity<T> {
    private entityId: Identity;
    protected attributes: T;

    protected constructor(attibutes: T, id?: Identity) {
        this.entityId = id ?? new Identity();
        this.attributes = attibutes;
    }

    get id(): Identity {
        return this.entityId;
    }
}