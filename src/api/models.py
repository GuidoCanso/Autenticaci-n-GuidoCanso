from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active

        }
