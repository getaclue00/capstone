class ModifyEmailType < ActiveRecord::Migration[5.0]
  def up
  	change_column :employees, :email, :text, :limit => 30
  	change_column :clients, :email, :text, :limit => 30
  end

  def down
  	change_column :employees, :email, :string, :limit => 30
  	change_column :clients, :email, :string, :limit => 30
  end


end
