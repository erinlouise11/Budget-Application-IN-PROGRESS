import os
from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
import json

database_path = 'postgres://postgres:Psqlpass!@localhost:5432/budget'

db = SQLAlchemy()

# setup_db(app) binds a flask application and a SQLAlchemy service
def setup_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)
    db.create_all()

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    bank_name = db.Column(db.String)
    card_type = db.Column(db.String)
    balance = db.Column(db.Numeric)    
    interest_rate = db.Column(db.Integer)

    def __init__(self, bank_name, card_type, balance, interest_rate):
        self.bank_name = bank_name
        self.card_type = card_type
        self.balance = balance
        self.interest_rate = interest_rate

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'bank_name': self.bank_name,
            'card_type': self.card_type, 
            'balance': self.balance,
            'interest_rate': self.interest_rate 
        }

    item_card = db.relationship('Item', backref='cards', lazy=True)

class Item(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String)
    amount = db.Column(db.Numeric)
    pay_date = db.Column(db.String)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    scheduled = db.Column(db.Boolean)
    active = db.Column(db.Boolean)

    def __init__(self, item_name, amount, pay_date, card_id, scheduled, active):
        self.item_name = item_name
        self.amount = amount
        self.pay_date = pay_date
        self.card_id = card_id
        self.scheduled = scheduled
        self.active = active

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'item_name': self.item_name,
            'amount': self.amount, 
            'pay_date': self.pay_date,
            'card_id': self.card_id, 
            'scheduled': self.scheduled, 
            'active': self.active
        }
