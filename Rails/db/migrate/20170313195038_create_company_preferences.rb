class CreateCompanyPreferences < ActiveRecord::Migration[5.0]
  def up
    create_table :company_preferences do |t|
      t.boolean :workMonday,    default: false, null: false
      t.string :mondayOpen,     default: '08:00:00', null: false
      t.string :mondayClose,    default: '17:00:00', null: false
      t.boolean :workTuesday,   default: false, null: false
      t.string :tuesdayOpen,    default: '08:00:00', null: false
      t.string :tuesdayClose,   default: '17:00:00', null: false
      t.boolean :workWednesday, default: false, null: false
      t.string :wednesdayOpen,  default: '08:00:00', null: false
      t.string :wednesdayClose, default: '17:00:00', null: false
      t.boolean :workThursday,  default: false, null: false
      t.string :thursdayOpen,   default: '08:00:00', null: false
      t.string :thursdayClose,  default: '17:00:00', null: false
      t.boolean :workFriday,    default: false, null: false
      t.string :fridayOpen,     default: '08:00:00', null: false
      t.string :fridayClose,    default: '17:00:00', null: false
      t.boolean :workSaturday,  default: false, null: false
      t.string :saturdayOpen,   default: '08:00:00', null: false
      t.string :saturdayClose,  default: '17:00:00', null: false
      t.boolean :workSunday,    default: false, null: false
      t.string :sundayOpen,     default: '08:00:00', null: false
      t.string :sundayClose,    default: '17:00:00', null: false
      t.references :employee,   foreign_key: true, index: true
      t.timestamps
    end
  end

  def down
    drop_table :company_preferences
  end
end
