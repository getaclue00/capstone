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

ActiveRecord::Schema.define(version: 20161030160023) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.string   "status",      limit: 30, default: "pending",             null: false
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.string   "color",                  default: "#AB00FF",             null: false
    t.string   "text_color",             default: "#FFFFFF",             null: false
    t.string   "title",                  default: "New Appointment",     null: false
    t.datetime "start",                  default: '2016-10-23 09:10:00', null: false
    t.datetime "end",                    default: '2016-12-31 09:10:00', null: false
    t.text     "notes"
    t.integer  "car_id",                                                 null: false
    t.integer  "service_id",                                             null: false
    t.integer  "employee_id"
    t.index ["car_id"], name: "index_appointments_on_car_id", using: :btree
    t.index ["employee_id"], name: "index_appointments_on_employee_id", using: :btree
    t.index ["service_id"], name: "index_appointments_on_service_id", using: :btree
  end

  create_table "cars", force: :cascade do |t|
    t.string   "make",       limit: 30, null: false
    t.string   "model",      limit: 30, null: false
    t.string   "size",       limit: 30, null: false
    t.string   "interior",   limit: 30, null: false
    t.string   "colour",     limit: 30, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "client_id",             null: false
    t.index ["client_id"], name: "index_cars_on_client_id", using: :btree
  end

  create_table "clients", force: :cascade do |t|
    t.string   "last_name",     limit: 30
    t.string   "first_name",    limit: 30
    t.string   "email",         limit: 30, null: false
    t.string   "phone_number",  limit: 12, null: false
    t.integer  "street_number",            null: false
    t.string   "street_name",   limit: 30, null: false
    t.string   "city",          limit: 30
    t.string   "province",      limit: 30
    t.string   "postal_code",   limit: 7,  null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["email"], name: "index_clients_on_email", unique: true, using: :btree
  end

  create_table "employees", force: :cascade do |t|
    t.string   "last_name",     limit: 30
    t.string   "first_name",    limit: 30
    t.string   "email",         limit: 30,                        null: false
    t.string   "phone_number",  limit: 12,                        null: false
    t.integer  "street_number",                                   null: false
    t.string   "street_name",   limit: 30,                        null: false
    t.string   "city",          limit: 30
    t.string   "province",      limit: 30
    t.string   "postal_code",   limit: 7,                         null: false
    t.date     "start_date",               default: '2016-10-31', null: false
    t.boolean  "is_admin",                 default: false,        null: false
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.index ["email"], name: "index_employees_on_email", unique: true, using: :btree
  end

  create_table "services", force: :cascade do |t|
    t.string   "name",                                 null: false
    t.decimal  "price_small", precision: 10, scale: 2
    t.decimal  "price_large", precision: 10, scale: 2
    t.decimal  "duration",    precision: 10, scale: 2
    t.text     "description"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
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
    t.string   "first_name",             default: "",    null: false
    t.string   "last_name",              default: "",    null: false
    t.string   "telephone",              default: "",    null: false
    t.boolean  "client",                 default: false, null: false
    t.boolean  "employee",               default: false, null: false
    t.index ["authentication_token"], name: "index_users_on_authentication_token", using: :btree
    t.index ["client"], name: "index_users_on_client", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["employee"], name: "index_users_on_employee", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "appointments", "cars"
  add_foreign_key "appointments", "employees"
  add_foreign_key "appointments", "services"
  add_foreign_key "cars", "clients"
end
