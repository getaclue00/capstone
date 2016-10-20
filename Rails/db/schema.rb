# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161020022141) do

  create_table "appointments", force: :cascade do |t|
    t.integer  "day"
    t.integer  "month"
    t.integer  "year"
    t.time     "start_time"
    t.time     "end_time"
    t.string   "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cars", force: :cascade do |t|
    t.string   "make"
    t.string   "model"
    t.string   "size"
    t.string   "interior"
    t.string   "colour"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clients", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "email"
    t.string   "phone_number"
    t.integer  "street_number"
    t.string   "street_name"
    t.string   "city"
    t.string   "province"
    t.string   "postal_code"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "email"
    t.string   "phone_number"
    t.integer  "street_number"
    t.string   "street_name"
    t.string   "city"
    t.string   "province"
    t.string   "postal_code"
    t.date     "start_date"
    t.boolean  "is_admin"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "services", force: :cascade do |t|
    t.string   "name"
    t.decimal  "price_small"
    t.decimal  "price_large"
    t.decimal  "duration"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end
