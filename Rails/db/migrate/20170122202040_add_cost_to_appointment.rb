class AddCostToAppointment < ActiveRecord::Migration[5.0]
  def up
    add_column  :appointments, :cost, :decimal, default: 0, precision: 10, scale: 2
    add_column  :appointments, :year, :integer, default: Time.now.year
    add_index   :appointments, [:week_number, :year]
  end

  def down
    remove_index    :appointments, [:week_number, :year]
    remove_column   :appointments, :cost
    remove_column   :appointments, :year
  end
end
