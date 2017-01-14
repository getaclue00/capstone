class AddWeekNumberToAppointments < ActiveRecord::Migration[5.0]
  def up
    add_column  :appointments, :week_number, :integer, default: 0
    add_index   :appointments, :week_number
  end

  def down
    remove_index   :appointments, :week_number
    remove_column  :appointments, :week_number, :integer
  end
end
