const {AccessControl} = require('accesscontrol')

const controls  = new AccessControl()

controls.grant('user')
.createOwn('video')
.deleteOwn('video')
.grant('admin')