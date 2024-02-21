export default class UserDto{
    email;
    id;
    isActivated;
    roles;
    isBanned;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.roles = model.roles;
        this.isActivated = model.isActivated;
        this.isBanned = model.isBanned;
    }
}