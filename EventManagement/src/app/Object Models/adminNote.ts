export class AdminNote {
    id: number;
    userId: number;
    adminId: number;
    note: string;
    createdAt: string; // formatted date string
    updatedAt: string; // formatted date string
    admin?: {
        id: number;
        fName: string;
        lName: string;
        email: string;
    };

    constructor(
        id: number,
        userId: number,
        adminId: number,
        note: string,
        createdAt: string,
        updatedAt: string,
        admin?: { id: number; fName: string; lName: string; email: string }
    ) {
        this.id = id;
        this.userId = userId;
        this.adminId = adminId;
        this.note = note;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        if (admin) this.admin = admin;
    }
}
