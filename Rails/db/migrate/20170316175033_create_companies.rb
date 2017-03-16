class CreateCompanies < ActiveRecord::Migration[5.0]
  def up
    create_table :companies do |t|
      t.string  :name, default: 'R & A DETAILING', null: false
      t.boolean :work_monday, default: false, null: false
      t.string :monday_open, default: '08:00:00', null: false
      t.string :monday_close, default: '17:00:00', null: false
      t.boolean :work_tuesday, default: false, null: false
      t.string :tuesday_open, default: '08:00:00', null: false
      t.string :tuesday_close, default: '17:00:00', null: false
      t.boolean :work_wednesday, default: false, null: false
      t.string :wednesday_open, default: '08:00:00', null: false
      t.string :wednesday_close, default: '17:00:00', null: false
      t.boolean :work_thursday, default: false, null: false
      t.string :thursday_open, default: '08:00:00', null: false
      t.string :thursday_close, default: '17:00:00', null: false
      t.boolean :work_friday, default: false, null: false
      t.string :friday_open, default: '08:00:00', null: false
      t.string :friday_close, default: '17:00:00', null: false
      t.boolean :work_saturday, default: false, null: false
      t.string :saturday_open, default: '08:00:00', null: false
      t.string :saturday_close, default: '17:00:00', null: false
      t.boolean :work_sunday, default: false, null: false
      t.string :sunday_open, default: '08:00:00', null: false
      t.string :sunday_close, default: '17:00:00', null: false
      t.string :contact_email, default: 'segradetailingcapstoneteam@gmail.com', null: false
      t.string :contact_phone_number
      t.timestamps
    end
    add_reference :employees, :company, index: true
  end
  def down
    remove_reference :employees, :company
    drop_table :companies
  end
end
