class ModifyEmployeesTable2 < ActiveRecord::Migration[5.0]
  def up
    remove_column :employees, :email, :string
    remove_column :employees, :is_admin, :boolean
  end

  def down
    add_column :employees, :email, :string
    add_column :employees, :is_admin, :boolean
  end
end
