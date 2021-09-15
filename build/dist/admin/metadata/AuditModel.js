export var auditModel = {
    name: 'audit',
    attributes: {
        id: {
            length: 40,
            required: true,
            key: true
        },
        resource: {
            length: 100,
            required: true
        },
        userId: {
            length: 20
        },
        ip: {
            length: 20
        },
        action: {
            length: 20
        },
        timestamp: {
            type: 'datetime'
        },
        status: {
            length: 10
        },
        remark: {
            length: 100
        },
    }
};
//# sourceMappingURL=AuditModel.js.map