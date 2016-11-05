class ModifyEmployeesTable < ActiveRecord::Migration[5.0]
  def up
    add_column :employees, :end_date, :date
    add_column :employees, :notes, :text
  end

  def down
    remove_column :employees, :end_date, :date
    remove_column :employees, :notes, :text
  end
end
