class AddBufferToServices < ActiveRecord::Migration[5.0]
  def up
    add_column     :services, :buffer_time, :decimal, precision: 10, scale: 2
  end

  def down
    remove_column     :services, :buffer_time, :decimal, precision: 10, scale: 2
  end
end
