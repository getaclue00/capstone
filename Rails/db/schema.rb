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

ActiveRecord::Schema.define(version: 20170215164919) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.string   "status",                               default: "pending",             null: false
    t.datetime "created_at",                                                           null: false
    t.datetime "updated_at",                                                           null: false
    t.string   "color",                                default: "#AB00FF",             null: false
    t.string   "text_color",                           default: "#FFFFFF",             null: false
    t.string   "title",                                default: "New Appointment",     null: false
    t.datetime "start",                                default: '2016-10-23 09:10:00', null: false
    t.datetime "end",                                  default: '2016-12-31 09:10:00', null: false
    t.text     "notes"
    t.integer  "service_id",                                                           null: false
    t.integer  "employee_id",                          default: 0,                     null: false
    t.integer  "week_number",                          default: 0
    t.decimal  "cost",        precision: 10, scale: 2, default: "0.0"
    t.integer  "year",                                 default: 2017
    t.integer  "client_id"
    t.index ["client_id"], name: "index_appointments_on_client_id", using: :btree
    t.index ["employee_id"], name: "index_appointments_on_employee_id", using: :btree
    t.index ["service_id"], name: "index_appointments_on_service_id", using: :btree
    t.index ["week_number", "year"], name: "index_appointments_on_week_number_and_year", using: :btree
    t.index ["week_number"], name: "index_appointments_on_week_number", using: :btree
  end

  create_table "cars", force: :cascade do |t|
    t.string   "make",       null: false
    t.string   "model",      null: false
    t.string   "size",       null: false
    t.string   "interior",   null: false
    t.string   "colour",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "client_id"
    t.index ["client_id"], name: "index_cars_on_client_id", using: :btree
  end

  create_table "clients", force: :cascade do |t|
    t.string   "last_name",                null: false
    t.string   "first_name",               null: false
    t.string   "email",                    null: false
    t.string   "phone_number",  limit: 12, null: false
    t.integer  "street_number",            null: false
    t.string   "street_name",              null: false
    t.string   "city"
    t.string   "province"
    t.string   "postal_code",   limit: 7,  null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["email"], name: "index_clients_on_email", unique: true, using: :btree
  end

  create_table "employees", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "phone_number",  limit: 12
    t.integer  "street_number"
    t.string   "street_name"
    t.string   "city"
    t.string   "province"
    t.string   "postal_code",   limit: 7
    t.date     "start_date",               default: '2017-02-15'
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.date     "end_date"
    t.text     "notes"
  end

  create_table "services", force: :cascade do |t|
    t.string   "name",                                                    null: false
    t.decimal  "duration",     precision: 10, scale: 2
    t.text     "description"
    t.datetime "created_at",                                              null: false
    t.datetime "updated_at",                                              null: false
    t.boolean  "active",                                default: false,   null: false
    t.boolean  "displayable",                           default: false,   null: false
    t.decimal  "price",        precision: 10, scale: 2
    t.string   "vehicle_size",                          default: "Small"
    t.index ["vehicle_size"], name: "index_services_on_vehicle_size", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.boolean  "admin",                  default: false, null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "authentication_token",   default: "",    null: false
    t.integer  "employee_id",                            null: false
    t.index ["authentication_token"], name: "index_users_on_authentication_token", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["employee_id"], name: "index_users_on_employee_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "appointments", "clients"
  add_foreign_key "appointments", "employees"
  add_foreign_key "appointments", "services"
  add_foreign_key "cars", "clients"
  add_foreign_key "users", "employees"
end
