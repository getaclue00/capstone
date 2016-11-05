class ModifyEmailType < ActiveRecord::Migration[5.0]
  def up
  	change_column :employees, :email, :text
  	change_column :clients, :email, :text
  end

  def down
  	change_column :employees, :email, :string
  	change_column :clients, :email, :string
  end


end
